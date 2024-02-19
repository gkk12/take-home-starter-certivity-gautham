package io.certivity.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "HtmlEntity")
public class HtmlEntity {

    @Id
    @Field("id")
    private String id;
    private String text;
    private String html;
    private int length;
    private int sort;
    private String url;
    private LocalDateTime createdAt;
    private LocalDateTime lastModified;
    private List<UserCommentEntity> comments = new ArrayList<>();

    public HtmlEntity(String text, String html, int length, int sort, String url, LocalDateTime createdAt,
            LocalDateTime lastModified) {
        this.id = UUID.randomUUID().toString(); 
        this.text = text;
        this.html = html;
        this.length = length;
        this.sort = sort;
        this.url = url;
        this.createdAt = createdAt;
        this.lastModified = lastModified;
    }
    
    public void addComment(UserCommentEntity commentEntity) {
        comments.add(commentEntity);
    }

    public void removeComment(UserCommentEntity commentEntity) {
        comments.remove(commentEntity);
    }

}
