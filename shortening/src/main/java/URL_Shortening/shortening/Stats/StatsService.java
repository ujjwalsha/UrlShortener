package URL_Shortening.shortening.Stats;

import URL_Shortening.shortening.Model.UrlStats;
import URL_Shortening.shortening.Repository.UrlRepo;
import URL_Shortening.shortening.Repository.UrlStatsRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

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


    public void captureAsynchronous(String shortUrl, long accessCount, HttpServletRequest request) {

        String uaString = request.getHeader("User-Agent");
        String ip = extractClientIp(request);
        String Browser = userAgentService.getBrowser(uaString);
        String os = userAgentService.getOs(uaString);
        UrlStats click = new UrlStats();

//        String apiUrl = "https://ipapi.co/" + ip;
//        RestTemplate restTemplate = new RestTemplate();
//        String country = restTemplate.getForObject(apiUrl, String.class);

        click.setCountry("India");
        click.setAccessedAt(LocalDateTime.now());
        click.setBrowser(Browser);
        click.setOperatingSystem(os);
        click.setIpAddress(ip);
        click.setShortUrl(shortUrl);
        click.setAccessCount(accessCount);
        urlStatsRepo.save(click);
    }

    private String extractClientIp(HttpServletRequest request)
    {
        String xHeader = request.getHeader("X-Forwarded-For");
        return (xHeader == null) ? request.getRemoteAddr() : xHeader.split(",")[0];
    }

    public ResponseEntity<?> getAllStats(String urlCode) {

        List<UrlStats> url = urlStatsRepo.findByShortUrl(urlCode);
        System.out.println(url);
        if(url.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(url,HttpStatus.OK);
    }
}
