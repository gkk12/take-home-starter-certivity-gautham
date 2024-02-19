package io.certivity.backend.dao;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.certivity.backend.model.HtmlEntity;

@Repository
public interface HtmlEntityRepository extends MongoRepository<HtmlEntity, String>{
    
}
