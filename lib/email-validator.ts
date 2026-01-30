/**
 * Advanced Email Validator
 * Checks:
 * 1. Format (Regex)
 * 2. Disposable Email Providers
 * 3. Mail Server (MX Record) - Note: In edge environments, we use a public DNS API
 */

export async function validateEmailReal(email: string): Promise<{ valid: boolean; message: string }> {
    // 1. Basic Format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email format." };
    }

    const [local, domain] = email.split("@");

    // 2. Block common disposable email domains
    const disposableDomains = [
        "temp-mail.org", "guerrillamail.com", "10minutemail.com",
        "mailinator.com", "trashmail.com", "yopmail.com",
        "dispostable.com", "getnada.com", "tempmail.net"
    ];

    if (disposableDomains.includes(domain.toLowerCase())) {
        return { valid: false, message: "Disposable emails are not allowed. Please use a permanent email." };
    }

    // 3. DNS Check (Verifies the domain actually has an email server)
    // We use Google's DNS-over-HTTPS because standard DNS modules don't work on Cloudflare Workers
    try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
        const data = await response.json() as any;

        // If no MX records, check for an A record (some servers use A as fallback)
        if (!data.Answer || data.Answer.length === 0) {
            const aResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
            const aData = await aResponse.json() as any;

            if (!aData.Answer || aData.Answer.length === 0) {
                return { valid: false, message: "The email domain does not seem to exist or cannot receive mail." };
            }
        }
    } catch (error) {
        // Fallback to true if DNS API is down
        console.error("DNS Check failed", error);
    }

    return { valid: true, message: "Valid" };
}
