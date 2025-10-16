package URL_Shortening.shortening.Stats;

import org.springframework.stereotype.Service;

import ua_parser.Client;
import ua_parser.Parser;

@Service
public class UserAgentService {

    private final Parser parser = new Parser();

    public String getBrowser(String userAgent)
    {
        if(userAgent == null) return "UnKnown";
        Client client = parser.parse(userAgent);
        return client.userAgent.family;
    }

    public String getOs(String userAgent)
    {
        if(userAgent == null) return "unknown";
        Client client = parser.parse(userAgent);
        return client.os.family;
    }

}
