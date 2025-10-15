package URL_Shortening.shortening.Service;


import URL_Shortening.shortening.Model.RequestUrl;
import URL_Shortening.shortening.Model.Url;
import URL_Shortening.shortening.Repository.UrlRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.net.URI;
import java.util.Optional;
import java.util.Random;

@Service
public class UrlService {


    private final UrlRepo urlRepo;

    @Autowired
    public UrlService(UrlRepo urlRepo) {
        this.urlRepo = urlRepo;
    }


    public ResponseEntity<?> createShortUrl(String originalUrl) {

        Optional<Url> existUrl = urlRepo.findByOriginalUrl(originalUrl);

        if(existUrl.isPresent()) return ResponseEntity.status(HttpStatus.OK).body(existUrl.get());

        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setShortUrl(generateShortCode());
        url.setAccessCount(0);

        urlRepo.save(url);

        return ResponseEntity.status(HttpStatus.OK).body("Created");

    }

    private String generateShortCode(){

        String Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for(int i = 0; i < 7; i++)
            sb.append(Chars.charAt(random.nextInt(Chars.length())));

        return sb.toString();
    }

    public String getOriginalUrl(String shortUrl) {

        Url url = urlRepo.findByShortUrl(shortUrl);

        url.setAccessCount(url.getAccessCount()+1);

        urlRepo.save(url);


        return url.getOriginalUrl();

    }

    public ResponseEntity<?> redirectToUrl(String shortUrl) {

        String originalUrl = getOriginalUrl(shortUrl);

        HttpHeaders headers = new HttpHeaders();

        headers.setLocation(URI.create(originalUrl));

        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    public ResponseEntity<?> getAllUrl() {

        return new ResponseEntity<>(urlRepo.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<?> deleteUrlById(Long id) {

        if(!urlRepo.existsById(id))
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("url not found");
        }

        urlRepo.deleteById(id);

        return ResponseEntity.status(HttpStatus.OK).body("url Deleted Successfully");
    }

    public ResponseEntity<?> updateUrlById(Long id, RequestUrl requestUrl) {

        if(!urlRepo.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("url not found");

        Url url = new Url();

        url.setOriginalUrl(requestUrl.getOriginalUrl());

        urlRepo.save(url);
        return ResponseEntity.status(HttpStatus.OK).body("updated successfully!");
    }
}
