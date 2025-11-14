import React, { useState } from "react";

const sections = [
  {
    id: "framework",
    title: "1. Code Framework Compatibility",
    question: "Is the customer using a supported UI framework (React, Vue, Web Components, Angular, Twig, Handlebars)?",
    yes: "GO",
    noPrompt: "Is it AEM (React/WE), PHP Twing, Astro, Kotlin/SwiftUI?",
    noYes: "MAYBE (Requires POC)",
    noNo: "NO-GO",
  },
  {
    id: "build",
    title: "2. Build / Compilation Toolchain",
    question: "Do they use Webpack, Vite, ESBuild, or Rollup?",
    yes: "GO",
    noPrompt: "Do they have a modifiable Node/JS-based build system?",
    noYes: "MAYBE",
    noNo: "NO-GO",
  },
  {
    id: "git",
    title: "3. Git Provider & Access",
    question: "Can Knapsack Cloud access their Git provider (GitHub, GitLab, Azure DevOps, Bitbucket)?",
    yes: "GO",
    noPrompt: "Can they allowlist Knapsack or provide VPN access?",
    noYes: "MAYBE",
    noNo: "NO-GO",
  },
  {
    id: "cicd",
    title: "4. CI/CD & Package Publishing",
    question: "Can their CI/CD run Node.js and npm?",
    yes: "GO",
    noPrompt: "Can their CI/CD be extended to support Node?",
    noYes: "MAYBE",
    noNo: "NO-GO",
  },
  {
    id: "hosting",
    title: "5. Hosting & Network",
    question: "Can they host a Node.js Deployed Workspace or use Knapsack hosting?",
    yes: "GO",
    noPrompt: "Are they open to using Knapsack hosting or adjusting infra?",
    noYes: "MAYBE",
    noNo: "NO-GO",
  },
  {
    id: "sso",
    title: "6. SSO & Identity",
    question: "Do they use Okta/Azure AD with SAML or OAuth/OIDC?",
    yes: "GO",
    noPrompt: "Does their IdP support SAML/OAuth with guidance?",
    noYes: "MAYBE",
    noNo: "NO-GO",
  },
];

export default function DecisionTree() {
  const [responses, setResponses] = useState({});
  const [open, setOpen] = useState(null);

  const answer = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>SE Technical Qualification Decision Tree</h1>
      <p style={styles.subtext}>
        Use this interactive decision tree to qualify enterprise customers for Knapsack technical readiness.
      </p>

      {sections.map((section) => (
        <div key={section.id} style={styles.section}>
          <div
            style={styles.sectionHeader}
            onClick={() => toggle(section.id)}
          >
            <strong>{section.title}</strong>
            <span>{open === section.id ? "▲" : "▼"}</span>
          </div>

          {open === section.id && (
            <div style={styles.sectionBody}>
              <p><strong>Q:</strong> {section.question}</p>

              <button style={styles.btnYes} onClick={() => answer(section.id, section.yes)}>
                Yes
              </button>
              <button style={styles.btnNo} onClick={() => answer(section.id, "NO")}>
                No
              </button>

              {responses[section.id] === "YES" && (
                <div style={styles.resultBox}>
                  <strong>{section.yes}</strong>
                </div>
              )}

              {responses[section.id] === "NO" && (
                <div style={styles.followup}>
                  <p>{section.noPrompt}</p>
                  <button style={styles.btnMaybe} onClick={() => answer(section.id, section.noYes)}>
                    Yes / Possibly
                  </button>
                  <button style={styles.btnNog} onClick={() => answer(section.id, section.noNo)}>
                    No
                  </button>
                </div>
              )}

              {["GO", "MAYBE (Requires POC)", "MAYBE", "NO-GO"].includes(responses[section.id]) && (
                <div style={styles.resultBox}>
                  <strong>{responses[section.id]}</strong>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <div style={styles.summaryBox}>
        <h2>Summary</h2>
        <p>Scoring:</p>
        <ul>
          <li>0–1 NO-GO → Green Path (Proceed)</li>
          <li>2–3 NO-GO → Risk (Escalate)</li>
          <li>4+ NO-GO → Red Path (Not viable)</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
  },
  subtext: {
    textAlign: "center",
    color: "#555",
  },
  section: {
    background: "#fff",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  sectionHeader: {
    padding: "14px 18px",
    background: "#e9e9e9",
    borderRadius: "8px 8px 0 0",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
  },
  sectionBody: {
    padding: "18px",
  },
  btnYes: {
    background: "#4CAF50",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  btnNo: {
    background: "#F44336",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  btnMaybe: {
    marginTop: "10px",
    background: "#FFC107",
    color: "#000",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  btnNog: {
    marginTop: "10px",
    background: "#F44336",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "15px",
    padding: "10px",
    background: "#f7f7f7",
    borderLeft: "4px solid #777",
  },
  summaryBox: {
    marginTop: "40px",
    padding: "20px",
    background: "#e3f2fd",
    borderLeft: "4px solid #2196F3",
    borderRadius: "6px",
  },
};
