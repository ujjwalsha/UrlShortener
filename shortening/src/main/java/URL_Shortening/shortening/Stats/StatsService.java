package URL_Shortening.shortening.Stats;


import URL_Shortening.shortening.Model.Url;
import URL_Shortening.shortening.Model.UrlStats;
import URL_Shortening.shortening.Repository.UrlRepo;
import URL_Shortening.shortening.Repository.UrlStatsRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class StatsService {


    private final UrlStatsRepo urlStatsRepo;
    private final UserAgentService userAgentService;
    private final UrlRepo urlRepo;

    public StatsService(UrlStatsRepo urlStatsRepo,UserAgentService userAgentService, UrlRepo urlRepo)
    {
        this.urlStatsRepo = urlStatsRepo;
        this.userAgentService = userAgentService;
        this.urlRepo = urlRepo;
    }


    public void captureAsynchronous(String shortUrl, HttpServletRequest request) {

        String uaString = request.getHeader("User-Agent");
        String ip = extractClientIp(request);
        String Browser = userAgentService.getBrowser(uaString);
        String os = userAgentService.getOs(uaString);
        UrlStats click = new UrlStats();
        String url = "http://localhost:8081/api/r/" + shortUrl;

        click.setAccessedAt(LocalDateTime.now());
        click.setBrowser(Browser);
        click.setOperatingSystem(os);
        click.setIpAddress(ip);
        click.setShortUrl(url);
        click.setCountry("India");

        urlStatsRepo.save(click);
    }

    private String extractClientIp(HttpServletRequest request)
    {
        String xHeader = request.getHeader("X-Forwarded-For");
        return (xHeader == null) ? request.getRemoteAddr() : xHeader.split(",")[0];
    }

    public ResponseEntity<?> getAllStats(String urlCode) {

        Url url = urlRepo.findByShortUrl(urlCode);
        System.out.println(url);
        if(url == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(urlStatsRepo.findAll(),HttpStatus.OK);
    }
}
