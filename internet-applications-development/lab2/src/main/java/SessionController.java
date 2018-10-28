import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Map;


@WebServlet(
        name = "SessionController",
        urlPatterns = "/SessionController"
)
public class SessionController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        HttpSession session = req.getSession();
        if(session.getAttribute("rows")==null)
        session.setAttribute("rows", new ArrayList<Map<String, String>>());
        PrintWriter out = resp.getWriter();
        out.print(new Gson().toJson(((ArrayList<Map<String, String>>) session.getAttribute("rows"))));
    }
}
