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
    }
}
