import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        "Supabase credentials not configured. Pre-order form will not work."
    );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

export async function addPreorderEmail(
    email: string,
    userType: "privat" | "bedrift",
    language: string
) {
    const { data, error } = await supabase
        .from("preorders")
        .insert([
            {
                email,
                user_type: userType,
                language,
                created_at: new Date().toISOString(),
            },
        ])
        .select();

    if (error) {
        if (error.code === "23505") {
            throw new Error("EMAIL_EXISTS");
        }
        throw error;
    }

    return data;
}
