import './Footer.scss'
import socials from '../../assets/social.svg';

const Footer = () => {
    return (
        <footer className="footer-container">
            <section className="footer-contact">
                <h2>Kontakta oss</h2>
                <p>Telefon: <span>054-11 11 11</span></p>
                <p>Mail: <span>Rewind@hotmail.com</span></p>
            </section>
            <section className="footer-read">
                <h2>Läs mer om oss</h2>
            </section>
            <section className="footer-social">
                <h2>Sociala medier</h2>
                <img src={ socials } alt="" />
            </section>
        </footer>
    )
}

export default Footer;