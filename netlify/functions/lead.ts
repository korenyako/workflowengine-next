import type { Context } from "@netlify/functions";

interface ContactData {
  first_name?: string;
  last_name?: string;
  business_phone?: string;
  company?: string;
  email?: string;
  job_function?: string;
  details?: string;
}

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let data: ContactData;
  try {
    data = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ message: "Invalid request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (
    !data.first_name ||
    !data.last_name ||
    !data.company ||
    !data.email ||
    !data.job_function
  ) {
    return new Response(
      JSON.stringify({
        message: "Not all fields in the form have been filled in correctly.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const bitrixUrl = process.env.BITRIX_URL;
  if (!bitrixUrl) {
    return new Response(
      JSON.stringify({ message: "Server configuration error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const queryData = new URLSearchParams();
  queryData.append("fields[SOURCE_ID]", "WEB");
  queryData.append(
    "fields[TITLE]",
    `${data.company} | Contact Us | Workflowengine.io`
  );
  queryData.append("fields[NAME]", data.first_name);
  queryData.append("fields[LAST_NAME]", data.last_name);
  queryData.append(
    "fields[ASSIGNED_BY_ID]",
    process.env.BITRIX_ASSIGNED_BY_ID || "1"
  );
  queryData.append("fields[EMAIL][0][VALUE]", data.email);
  queryData.append("fields[EMAIL][0][VALUE_TYPE]", "WORK");
  queryData.append("fields[PHONE][0][VALUE]", data.business_phone);
  queryData.append("fields[PHONE][0][VALUE_TYPE]", "WORK");
  queryData.append("fields[WEB][0][VALUE]", "workflowengine.io");
  queryData.append("fields[COMPANY_TITLE]", data.company);
  queryData.append("fields[POST]", data.job_function);
  queryData.append("fields[COMMENTS]", data.details || "");
  queryData.append("params[REGISTER_SONET_EVENT]", "N");

  try {
    const response = await fetch(`${bitrixUrl}crm.lead.add.json`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: queryData.toString(),
    });

    const responseBody = await response.text();

    if (!response.ok) {
      console.error("Bitrix24 error:", response.status, responseBody);
      return new Response(
        JSON.stringify({
          message: "Failed to create lead",
          debug: { status: response.status, body: responseBody },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ status: 200, message: "Your message has been sent" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Network error:", err);
    return new Response(
      JSON.stringify({
        message: "Failed to connect to CRM",
        debug: { error: String(err) },
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
};
