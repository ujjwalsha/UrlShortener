package URL_Shortening.shortening.Repository;

import URL_Shortening.shortening.Model.Url;
import URL_Shortening.shortening.Model.UrlStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlStatsRepo extends JpaRepository<UrlStats, Long> {
    List<UrlStats> findByShortUrl(String shortUrl);
}
