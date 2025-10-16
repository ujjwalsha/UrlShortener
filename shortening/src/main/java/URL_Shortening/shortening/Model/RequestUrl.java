package URL_Shortening.shortening.Model;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestUrl {

    @Column(nullable = false)
    private String originalUrl;
}
