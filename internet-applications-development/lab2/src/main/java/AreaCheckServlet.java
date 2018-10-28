import com.google.gson.Gson;
import org.apache.commons.lang3.ArrayUtils;

import java.io.PrintWriter;
import java.lang.Math;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(
        name = "AreaCheckServlet",
        urlPatterns = "/AreaCheckServlet"
)
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String> responseMap = new HashMap<String, String>();
        List<String> responseList = new ArrayList<String>();

        String x = (String) req.getAttribute("x");
        String y = (String) req.getAttribute("y");
        String r = (String) req.getAttribute("r");
        boolean click = Boolean.parseBoolean((String)(req.getAttribute("click")));

        responseMap.put("x", x);
        responseMap.put("r", r);
        responseMap.put("y", y);


        if (validate(x, y, r, click)) {
            if (isInArea(x, y, r)) {
                responseMap.put("result", "Success");
            } else responseMap.put("result", "Fail");
        } else responseMap.put("result", "Validation fail");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();

        HttpSession session = req.getSession();
        ArrayList<Map<String, String>> rows = (ArrayList<Map<String, String>>) session.getAttribute("rows");
        rows.add(responseMap);
        session.setAttribute("rows", rows);

        out.print(new Gson().toJson(responseMap));

    }

    private boolean validate(String x, String y, String r, boolean click) {
        double[] xValues = {-5, -4, -3, -2, -1, 0, 1, 2, 3};
        double[] rValues = {1, 1.5, 2, 2.5, 3};

        if ((isNumeric(x)) && (isNumeric(y)) && (isNumeric(r))) {
            double dx = Double.parseDouble(x);
            double dy = Double.parseDouble(y);
            double dr = Double.parseDouble(r);
            if ( (ArrayUtils.contains(xValues, dx) || (click) ) && (ArrayUtils.contains(rValues, dr))
                && (dy <= 5) && (dy >=-5))
                return true;
        }
        return false;
    }

    private boolean isInArea(String x, String y, String r){
        double dx = Double.parseDouble(x);
        double dy = Double.parseDouble(y);
        double dr = Double.parseDouble(r);

        if ((dx <= 0) && (dy >= 0)) {
            if( (dx >= -dr) && (dy <= dr/2) )
                return true;
        } else if ( (dx >= 0) && (dy >= 0) ) {
            if ((dx <= dr) && (dy <= (-dx / 2 + dr / 2)))
                return true;
        } else if ((dx >= 0) && (dy <= 0)) {
            if ((Math.pow(dx, 2) + Math.pow(dy, 2)) <= Math.pow(dr, 2)) {
                return true;
            }
        }
        return false;

        }

    private  boolean isNumeric(String str)
    {
        try
        {
            double d = Double.parseDouble(str);
        }
        catch(NumberFormatException nfe)
        {
            return false;
        }
        return true;
    }
}
