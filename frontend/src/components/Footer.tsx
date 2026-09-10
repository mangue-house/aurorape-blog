import Link from "next/link";
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
              <Link href="https://whatsapp.com/channel/0029Vb6UCqYCnA82J87CSD07" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </Link>
              <Link href="https://www.instagram.com/aurorapenoticia/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link href="https://www.facebook.com/AgenciaJCMazella" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="https://www.youtube.com/@AuroraPEnoticia" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z" />
                </svg>
              </Link>
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
          <span>CNPJ: 42.993.144/0001-36</span>
          <span>
            Desenvolvido por{" "}
            <a href="https://manguehouse.com/" target="_blank" rel="noopener noreferrer">
              Mangue House
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
