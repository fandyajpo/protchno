import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/ironSes";

const query = async (field) => {
  const query = await fetch("https://soal.staging.id/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(field),
  });
  return query;
};

export default withIronSessionApiRoute(authRoute, sessionOptions);

async function authRoute(req, res) {
  var user = await req.session;

  try {
    const response = await query(req.body);
    const result = await response.json();

    const saveSess = async (r) => {
      user = {
        access_token: r.access_token,
        refresh_token: r.refresh_token,
        username: req.body.username,
        password: req.body.password,
      };
      req.session = user;
      await req.session.save();
    };

    if (!response.ok) {
      const error = new Error(response.status);
      error.info = result;
      error.status = response.status;
      throw error;
    }

    const ret = {
      isLoggedIn: true,
      access_token: result.access_token,
      refresh_token: result.refresh_token,
    };

    await saveSess(result);

    res.status(200).json(ret);
  } catch (error) {
    res.status(400).end("osnaj");
  }
}
