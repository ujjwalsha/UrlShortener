package URL_Shortening.shortening.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
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
    @Column(nullable = true)
    private long accessCount = 0;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-mm-yyyy, HH:MM:SS")
    private LocalDateTime accessedAt;

    public UrlStats() {
    }
}
