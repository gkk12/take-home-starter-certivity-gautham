package io.certivity.backend.api;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.certivity.backend.dao.HtmlEntityRepository;
import io.certivity.backend.model.HtmlEntity;
import io.certivity.backend.model.UserCommentEntity;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ApiController {

    private final HtmlEntityRepository repository;

    public ApiController(HtmlEntityRepository repository) {
        this.repository = repository;
    }

    public record CustomResponse(String message) {
    }


    @GetMapping("/")
    public ResponseEntity<CustomResponse> helloWorld() {
        return ResponseEntity.ok().body(new CustomResponse("A Tale of Two Cities"));
    }

    @PostMapping("/extract")
    public ResponseEntity<List<HtmlEntity>> extractHtmlContent(@RequestParam String url) {

        try {
            Document document = Jsoup.connect(url).get();
            Element bodyContent = document.getElementById("bodyContent");

            if (bodyContent != null) {
                Elements elements = bodyContent.select("p, h1, h2, h3, h4, h5, h6, ol, ul");

                List<HtmlEntity> entities = new ArrayList<>();
                int sort = 0;

                for (Element element : elements) {
                    String text = element.text();
                    String html = element.outerHtml();
                    int length = text.length();

                    HtmlEntity entity = new HtmlEntity(
                            text,
                            html,
                            length,
                            sort++,
                            url,
                            LocalDateTime.now(),
                            LocalDateTime.now());

                    entities.add(entity);
                    repository.save(entity);
                }

                return ResponseEntity.ok().body(entities);
            } else {
                System.out.println("Element with ID 'bodycontent' not found.");
                return ResponseEntity.badRequest().body(null);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/comment")
    public ResponseEntity<HtmlEntity> addComment(
            @RequestBody Map<String, String> requestBody) {
        try {
            String contentId = requestBody.get("contentId");
            String commentor = requestBody.get("commentor");
            String comment = requestBody.get("comment");
           System.out.println(contentId + commentor +comment);
            HtmlEntity htmlEntity = repository.findById(contentId).orElse(null);

            if (htmlEntity != null) {
                UserCommentEntity commentEntity = new UserCommentEntity(
                        comment,
                        LocalDateTime.now(),
                        commentor);

                htmlEntity.addComment(commentEntity);
                repository.save(htmlEntity);

                return ResponseEntity.ok().body(repository.save(htmlEntity));
            } else {
                System.out.println("HtmlEntity with ID '" + contentId + "' not found.");
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @DeleteMapping("/comment")
    public ResponseEntity<UserCommentEntity> deleteComment(
            @RequestParam String contentId,
            @RequestParam String commentId) {
        try {
            HtmlEntity htmlEntity = repository.findById(contentId).orElse(null);

            if (htmlEntity != null) {
                UserCommentEntity commentEntityToRemove = null;

                for (UserCommentEntity commentEntity : htmlEntity.getComments()) {
                    if (commentEntity.getId().equals(commentId)) {
                        commentEntityToRemove = commentEntity;
                        break;
                    }
                }

                if (commentEntityToRemove != null) {
                    htmlEntity.removeComment(commentEntityToRemove);
                    repository.save(htmlEntity);
                    return ResponseEntity.ok().body(commentEntityToRemove);
                } else {
                    System.out.println("Comment with ID '" + commentId + "' not found for HtmlEntity with ID '"
                            + contentId + "'.");
                    return ResponseEntity.badRequest().body(null);
                }
            } else {
                System.out.println("HtmlEntity with ID '" + contentId + "' not found.");
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @PutMapping("/comment")
    public ResponseEntity<UserCommentEntity> updateComment(
            @RequestParam String contentId,
            @RequestParam String commentId,
            @RequestBody Map<String, String> requestBody) {
        try {
            HtmlEntity htmlEntity = repository.findById(contentId).orElse(null);

            if (htmlEntity != null) {
                for (UserCommentEntity commentEntity : htmlEntity.getComments()) {
                    if (commentEntity.getId().equals(commentId)) {
                        String updatedComment = requestBody.get("comment");
                        String updatedCommentor = requestBody.get("commentor");

                        commentEntity.setComment(updatedComment);
                        commentEntity.setCommentor(updatedCommentor);

                        repository.save(htmlEntity);
                        return ResponseEntity.ok().body(commentEntity);
                    }
                }

                System.out.println("Comment with ID '" + commentId + "' not found for HtmlEntity with ID '" + contentId + "'.");
                return ResponseEntity.badRequest().body(null);
            } else {
                System.out.println("HtmlEntity with ID '" + contentId + "' not found.");
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/retrieveContents")
    public ResponseEntity<List<HtmlEntity>> retrieveContents() {
        try {
            List<HtmlEntity> entities = repository.findAll();
            return ResponseEntity.ok().body(entities);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @GetMapping("/comments")
    public ResponseEntity<List<UserCommentEntity>> retrieveComments(
            @RequestParam String contentId) 
    {
        try {
            HtmlEntity htmlEntity = repository.findById(contentId).orElse(null);
            if (htmlEntity != null) {
                
                List<UserCommentEntity> comments = htmlEntity.getComments();

                return ResponseEntity.ok().body(comments);
            } else {
                System.out.println("HtmlEntity with ID '" + contentId + "' not found.");
                return ResponseEntity.badRequest().body(null);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
}

