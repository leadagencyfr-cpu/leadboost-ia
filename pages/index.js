// pages/index.js
import { useState } from "react";
function CheckIcon(props){
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M20 6 9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>);
}
export default function Home() {
  const [secteur, setSecteur] = useState("");
  const [ton, setTon] = useState("professionnel");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if(!secteur) return setError("Indique ton secteur (ex : coaching B2B).");
    setLoading(true); setError(""); setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secteur, ton })
      });
      if (!res.ok) throw new Error("Erreur API");
      const data = await res.json();
      setResult(data.result || "");
    } catch (e) {
      setError("Erreur : vérifie la variable OPENAI_API_KEY dans Netlify.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container" style={{display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:18}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div className="pill" title="LeadBoost IA">🚀</div>
          <strong>LeadBoost IA</strong>
        </div>
        <div style={{display:"flex", gap:10}}>
          <a href="/landing" className="btn-ghost">Tarifs</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
        </div>
      </div>

      <section className="container section">
        <div className="grid grid-2">
          <div className="fade-in">
            <span className="badge">Nouveau • Micro-SaaS pour freelances</span>
            <h1>Génère ta prospection <span style={{background:"linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip:"text", color:"transparent"}}>en 2 minutes</span></h1>
            <p style={{color:"#475569", marginTop:6}}>
              Emails + script LinkedIn + mini-page de vente. Personnalisé à ton secteur. Prêt à copier-coller ou à envoyer via tes outils.
            </p>
            <ul style={{listStyle:"none", padding:0, margin:"16px 0", color:"#334155"}}>
              <li style={{display:"flex", alignItems:"center", gap:8}}><CheckIcon/> Templates testés & optimisés conversion</li>
              <li style={{display:"flex", alignItems:"center", gap:8}}><CheckIcon/> Ton au choix : professionnel, convivial, percutant</li>
              <li style={{display:"flex", alignItems:"center", gap:8}}><CheckIcon/> Intégrable Zapier/Make (MailerLite, etc.)</li>
            </ul>
          </div>

          <div className="card fade-in" style={{padding:20}}>
            <h3 style={{marginBottom:6}}>Créer ma séquence</h3>
            <label style={{fontSize:14, color:"#475569"}}>Secteur</label>
            <input className="input" placeholder="Ex : coaching LinkedIn B2B, agence SEO, création de sites" value={secteur} onChange={(e)=>setSecteur(e.target.value)} />
            <div style={{height:12}}/>
            <label style={{fontSize:14, color:"#475569"}}>Ton du message</label>
            <select className="select" value={ton} onChange={(e)=>setTon(e.target.value)}>
              <option value="professionnel">Professionnel</option>
              <option value="convivial">Convivial</option>
              <option value="percutant">Percutant</option>
            </select>
            <div style={{display:"flex", gap:10, marginTop:16}}>
              <button className="btn" onClick={generate} disabled={loading}>
                {loading ? "Génération..." : "Générer"}
              </button>
              <a className="btn-ghost" href="/landing">Voir les offres</a>
            </div>
            {error && <p style={{color:"crimson", marginTop:12}}>{error}</p>}
            {result && (
              <div className="card" style={{padding:16, marginTop:16, background:"#fff"}}>
                <h3 style={{marginTop:0}}>Résultat</h3>
                <pre style={{whiteSpace:"pre-wrap", margin:0}}>{result}</pre>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="card" style={{padding:22}}>
          <h2 className="center">Résultats de nos premiers utilisateurs</h2>
          <div className="grid grid-2" style={{marginTop:10}}>
            <div className="card" style={{padding:16, background:"#fff"}}>
              <strong>Maxime – Consultant SEO</strong>
              <p style={{color:"#475569"}}>“3 rendez-vous qualifiés en 48h grâce à la séquence IA.”</p>
            </div>
            <div className="card" style={{padding:16, background:"#fff"}}>
              <strong>Sarah – Coach LinkedIn</strong>
              <p style={{color:"#475569"}}>“J’ai gagné 4h par semaine. Et le taux de réponse a bondi.”</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="container center">
        <div>© {new Date().getFullYear()} LeadBoost IA — Créé pour freelances & agences.</div>
      </footer>
    </div>
  );
}
