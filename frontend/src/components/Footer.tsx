import type { CategoryOut } from "@/lib/types";
import NewsletterForm from "./NewsletterForm";

export default function Footer({ categories }: { categories: CategoryOut[] }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand__logo">Aurora PE</div>
            <p>
              Jornalismo independente comprometido com a verdade e com Pernambuco. Fundado por jornalistas
              pernambucanos para servir ao interesse público.
            </p>
            <div className="footer-social" aria-label="Redes sociais">
              <a href="#" aria-label="Twitter / X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Editorias</h4>
            <ul>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <a href={`/categoria/${cat.slug}`}>{cat.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Institucional</h4>
            <ul>
              <li><a href="/sobre">Sobre</a></li>
              <li><a href="/expediente">Expediente</a></li>
              <li><a href="/agenda-sindical">Agenda Sindical</a></li>
              <li><a href="/apoie">Apoie</a></li>
              <li><a href="/contato">Contato</a></li>
              <li><a href="/privacidade">Privacidade</a></li>
              <li><a href="/termos">Termos de Uso</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <p style={{ fontSize: "0.8125rem", marginBottom: "0.75rem", lineHeight: 1.5 }}>
              Receba as melhores matérias direto no e-mail.
            </p>
            <NewsletterForm id="newsletter-footer-feedback" />
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Aurora PE. Todos os direitos reservados.</span>
          <span>CNPJ: 00.000.000/0000-00</span>
        </div>
      </div>
    </footer>
  );
}
