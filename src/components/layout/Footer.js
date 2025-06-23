import styles from './Footer.module.css'
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

function Footer (){

    return(
        <footer className={styles.footer}>
            <p className={styles.copy_right}><span>Vetalis</span> &copy; 2025 </p>
        </footer>
    )
}

export default Footer