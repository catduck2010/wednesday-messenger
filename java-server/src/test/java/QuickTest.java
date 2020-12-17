import com.wednesday.helper.Pbkdf2;
import com.wednesday.model.User;
import org.junit.Test;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class QuickTest {
    @Test
    public void Test1(){
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("ogm-mongodb");
        EntityManager em = emf.createEntityManager();

        User u = new User("909099","Hi","777689");
        em.persist(u);
        System.out.println(u.getId());
    }

    @Test
    public void hashTest(){
        String password = "wryyyy";
        String hash2 = Pbkdf2.encode(password);
        //String hash = "777689$3bc1aa555edd0be366c963197800fd31$aca994805eb7497848eb36aab63ab50859f73c4048718eae765c7463170eb73d";
       // boolean result = Pbkdf2.verification(password,hash);
        System.out.println(hash2);
    }
}
