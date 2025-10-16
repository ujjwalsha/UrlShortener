package URL_Shortening.shortening.Repository;

import URL_Shortening.shortening.Model.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UrlRepo extends JpaRepository<Url, Long> {
    Optional<Url> findByOriginalUrl(String originalUrl);
    Url findByShortUrl(String shortUrl);
}
