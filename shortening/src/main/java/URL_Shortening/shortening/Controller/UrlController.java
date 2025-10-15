package URL_Shortening.shortening.Controller;

import URL_Shortening.shortening.Model.RequestUrl;
import URL_Shortening.shortening.Service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UrlController {

    private final UrlService urlService;

    @Autowired
    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUrl()
    {
        return urlService.getAllUrl();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUrl(@RequestBody RequestUrl requestUrl)
    {
        return urlService.createShortUrl(requestUrl.getOriginalUrl());
    }

    @GetMapping("/s/{shortUrl}")
    public ResponseEntity<?> redirectOriginal(@PathVariable String shortUrl)
    {
        return urlService.redirectToUrl(shortUrl);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUrl(@PathVariable Long id)
    {
        return urlService.deleteUrlById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUrl(@PathVariable Long id, @RequestBody RequestUrl requestUrl)
    {
        return urlService.updateUrlById(id, requestUrl);
    }

    @GetMapping("/{shortUrl}")
    public ResponseEntity<?> getOriginalUrl(@PathVariable String shortUrl)
    {
        return ResponseEntity.status(HttpStatus.OK).body(urlService.getOriginalUrl(shortUrl));
    }
}
