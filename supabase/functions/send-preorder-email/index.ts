// deno-lint-ignore-file
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - This is a Deno/Supabase Edge Function, not a Node.js file

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface PreorderRecord {
    id: number;
    email: string;
    user_type: "privat" | "bedrift";
    language: string;
    created_at: string;
}

interface WebhookPayload {
    type: "INSERT";
    table: "preorders";
    record: PreorderRecord;
    schema: "public";
}

const emailTemplates = {
    en: {
        subject: "Welcome to Fixora - You're on the list!",
        html: `
      <div style="font-family: 'Roboto', 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0914; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.06);">
        <!-- Header -->
        <div style="padding: 48px 24px; text-align: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" style="display: block; margin: 0 auto 16px auto;"><path stroke="#ff007f" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M46.5 21.6 39 14.1V3.7H32.1v5.82L23.9 1.34 1.34 23.9h6.02v21.9h15.42m0 0c-8.6 0-8.53-13.08 0-13.08l-.018.004c0-8.6 13.08-8.53 13.08 0v13.08H22.78Z"/></svg>
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Fixora</h1>
        </div>

        <!-- Main content -->
        <div style="padding: 48px 32px;">
          <h2 style="color: #f9e6f2; margin: 0 0 24px 0; font-size: 26px; font-weight: 700;">You're on the list!</h2>
          <p style="color: rgba(249, 230, 242, 0.85); font-size: 16px; line-height: 1.7; margin: 0 0 16px 0;">
            Thank you for signing up for early access to Fixora.
          </p>
          <p style="color: rgba(249, 230, 242, 0.85); font-size: 16px; line-height: 1.7; margin: 0 0 24px 0;">
            You're now on our exclusive list and will be among the <strong style="color: #ff007f;">first to know</strong> when we launch.
          </p>
          <div style="background: linear-gradient(135deg, rgba(255, 0, 127, 0.15) 0%, rgba(255, 77, 166, 0.08) 100%); border: 1px solid rgba(255, 0, 127, 0.3); border-radius: 12px; padding: 20px 24px; margin: 32px 0;">
            <p style="color: #f9e6f2; font-size: 15px; line-height: 1.6; margin: 0;">
              We'll send you an email on launch day with instructions on how to get started.
            </p>
          </div>
          <p style="color: rgba(249, 230, 242, 0.85); font-size: 16px; line-height: 1.7; margin: 32px 0 0 0;">
            Best regards,<br/><strong style="color: #f9e6f2;">The Fixora Team</strong>
          </p>
        </div>

        <!-- Divider -->
        <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(255, 0, 127, 0.3) 50%, transparent 100%); margin: 0 32px;"></div>

        <!-- Social media -->
        <div style="padding: 32px; text-align: center;">
          <p style="color: rgba(249, 230, 242, 0.55); font-size: 13px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">Follow us for updates</p>
          <a href="https://instagram.com/fixora.no" style="display: inline-block; margin: 0 12px; color: #ff007f; text-decoration: none; font-size: 14px; font-weight: 500;">Instagram</a>
          <a href="https://facebook.com/fixora.no" style="display: inline-block; margin: 0 12px; color: #ff007f; text-decoration: none; font-size: 14px; font-weight: 500;">Facebook</a>
          <a href="https://linkedin.com/company/fixora" style="display: inline-block; margin: 0 12px; color: #ff007f; text-decoration: none; font-size: 14px; font-weight: 500;">LinkedIn</a>
        </div>

        <!-- Footer -->
        <div style="background: rgba(255, 255, 255, 0.02); padding: 24px 32px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06);">
          <p style="color: rgba(249, 230, 242, 0.45); font-size: 12px; margin: 0 0 8px 0;">Nordintechs AS · Thormøhlens gate 51, 5006 Bergen</p>
          <p style="color: rgba(249, 230, 242, 0.45); font-size: 12px; margin: 0;">
            <a href="https://fixora.no" style="color: #ff007f; text-decoration: none;">fixora.no</a>
            <span style="margin: 0 8px;">·</span>
            <a href="mailto:support@fixora.no" style="color: #ff007f; text-decoration: none;">support@fixora.no</a>
          </p>
        </div>
      </div>
    `,
    },
    no: {
        subject: "Velkommen til Fixora - Du er på listen!",
        html: `
      <div style="font-family: 'Roboto', 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0914; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.06);">
        <!-- Header -->
        <div style="padding: 48px 24px; text-align: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" style="display: block; margin: 0 auto 16px auto;"><path stroke="#ff007f" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M46.5 21.6 39 14.1V3.7H32.1v5.82L23.9 1.34 1.34 23.9h6.02v21.9h15.42m0 0c-8.6 0-8.53-13.08 0-13.08l-.018.004c0-8.6 13.08-8.53 13.08 0v13.08H22.78Z"/></svg>
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Fixora</h1>
        </div>

        <!-- Main content -->
        <div style="padding: 48px 32px;">
          <h2 style="color: #f9e6f2; margin: 0 0 24px 0; font-size: 26px; font-weight: 700;">Du er på listen!</h2>
          <p style="color: rgba(249, 230, 242, 0.85); font-size: 16px; line-height: 1.7; margin: 0 0 16px 0;">
            Takk for at du registrerte deg for tidlig tilgang til Fixora.
          </p>
          <p style="color: rgba(249, 230, 242, 0.85); font-size: 16px; line-height: 1.7; margin: 0 0 24px 0;">
            Du er nå på vår eksklusive liste og vil være blant de <strong style="color: #ff007f;">første som får vite</strong> når vi lanserer.
          </p>
          <div style="background: linear-gradient(135deg, rgba(255, 0, 127, 0.15) 0%, rgba(255, 77, 166, 0.08) 100%); border: 1px solid rgba(255, 0, 127, 0.3); border-radius: 12px; padding: 20px 24px; margin: 32px 0;">
            <p style="color: #f9e6f2; font-size: 15px; line-height: 1.6; margin: 0;">
              Vi sender deg en e-post på lanseringsdagen med instruksjoner om hvordan du kommer i gang.
            </p>
          </div>
          <p style="color: rgba(249, 230, 242, 0.85); font-size: 16px; line-height: 1.7; margin: 32px 0 0 0;">
            Med vennlig hilsen,<br/><strong style="color: #f9e6f2;">Fixora-teamet</strong>
          </p>
        </div>

        <!-- Divider -->
        <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(255, 0, 127, 0.3) 50%, transparent 100%); margin: 0 32px;"></div>

        <!-- Social media -->
        <div style="padding: 32px; text-align: center;">
          <p style="color: rgba(249, 230, 242, 0.55); font-size: 13px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">Følg oss for oppdateringer</p>
          <a href="https://instagram.com/fixora.no" style="display: inline-block; margin: 0 12px; color: #ff007f; text-decoration: none; font-size: 14px; font-weight: 500;">Instagram</a>
          <a href="https://facebook.com/fixora.no" style="display: inline-block; margin: 0 12px; color: #ff007f; text-decoration: none; font-size: 14px; font-weight: 500;">Facebook</a>
          <a href="https://linkedin.com/company/fixora" style="display: inline-block; margin: 0 12px; color: #ff007f; text-decoration: none; font-size: 14px; font-weight: 500;">LinkedIn</a>
        </div>

        <!-- Footer -->
        <div style="background: rgba(255, 255, 255, 0.02); padding: 24px 32px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06);">
          <p style="color: rgba(249, 230, 242, 0.45); font-size: 12px; margin: 0 0 8px 0;">Nordintechs AS · Thormøhlens gate 51, 5006 Bergen</p>
          <p style="color: rgba(249, 230, 242, 0.45); font-size: 12px; margin: 0;">
            <a href="https://fixora.no" style="color: #ff007f; text-decoration: none;">fixora.no</a>
            <span style="margin: 0 8px;">·</span>
            <a href="mailto:support@fixora.no" style="color: #ff007f; text-decoration: none;">support@fixora.no</a>
          </p>
        </div>
      </div>
    `,
    },
};

serve(async (req) => {
    try {
        const payload: WebhookPayload = await req.json();

        if (payload.type !== "INSERT") {
            return new Response(JSON.stringify({ message: "Not an insert" }), {
                status: 200,
            });
        }

        const { email, language } = payload.record;
        const template =
            emailTemplates[language as keyof typeof emailTemplates] ||
            emailTemplates.en;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Fixora <noreply@fixora.no>",
                to: [email],
                subject: template.subject,
                html: template.html,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Resend error:", data);
            return new Response(JSON.stringify({ error: data }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
});
