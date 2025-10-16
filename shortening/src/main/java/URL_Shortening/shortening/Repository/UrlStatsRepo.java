package URL_Shortening.shortening.Repository;

import URL_Shortening.shortening.Model.UrlStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlStatsRepo extends JpaRepository<UrlStats, Long> {
}
