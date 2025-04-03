import type React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <span className={styles.brandName}>
            Cam<span className={styles.brandAccent}>i</span>on
          </span>
          <p className={styles.copyright}>
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.linkColumn}>
            <h4 className={styles.linkHeader}>Company</h4>
            <Link to="/about" className={styles.footerLink}>
              About Us
            </Link>
            <Link to="/contact" className={styles.footerLink}>
              Contact
            </Link>
            <Link to="/careers" className={styles.footerLink}>
              Careers
            </Link>
          </div>

          <div className={styles.linkColumn}>
            <h4 className={styles.linkHeader}>Legal</h4>
            <Link to="/privacy" className={styles.footerLink}>
              Privacy Policy
            </Link>
            <Link to="/terms" className={styles.footerLink}>
              Terms of Service
            </Link>
          </div>

          <div className={styles.linkColumn}>
            <h4 className={styles.linkHeader}>Support</h4>
            <Link to="/help" className={styles.footerLink}>
              Help Center
            </Link>
            <Link to="/faq" className={styles.footerLink}>
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
