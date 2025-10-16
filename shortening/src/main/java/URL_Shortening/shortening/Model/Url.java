package URL_Shortening.shortening.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String originalUrl;
    private String shortUrl;
    @JsonIgnore
    private LocalDateTime createdAt;
    private long accessCount;

    public Url()
    {
        this.createdAt =LocalDateTime.now();
    }
}
