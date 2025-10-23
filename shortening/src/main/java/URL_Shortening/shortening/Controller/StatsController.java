package URL_Shortening.shortening.Controller;

import URL_Shortening.shortening.Stats.StatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StatsController {

    private final StatsService statsService;
    public StatsController(StatsService statsService)
    {
        this.statsService = statsService;
    }

    @GetMapping("/stats/{urlCode}")
    public ResponseEntity<?> getAllStats(@PathVariable String urlCode)
    {
        return statsService.getAllStats(urlCode);
    }
}
