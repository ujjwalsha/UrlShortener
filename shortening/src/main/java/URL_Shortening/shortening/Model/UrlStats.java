package URL_Shortening.shortening.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
public class UrlStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String shortUrl;
    private String ipAddress;
    private String browser;
    private String OperatingSystem;
    private String country;
    private LocalDateTime accessedAt;

    public UrlStats() {
    }
}
