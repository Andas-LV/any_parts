import React from "react";
import styles from "./Footer.module.css";
import { SocialIcons } from "@/assets/svg/socialsSvg";

export default function Footer() {
	return (
		<div className={styles.Footer}>
			<div className={styles.footHeader}>
				<p>© Any Parts, 2025. Все права защищены.</p>

				<div className={styles.navs}>
					<nav>Стать продавцом</nav>
					<nav>Пользовательское соглашение</nav>
					<nav>Политика конфиденциальности</nav>
				</div>
			</div>

			<div className={styles.socials}>
				<div className={styles.social}>
					<SocialIcons.Youtube />
				</div>
				<div className={styles.social}>
					<SocialIcons.Insta />
				</div>
				<div className={styles.social}>
					<SocialIcons.Telegram />
				</div>
				<div className={styles.social}>
					<SocialIcons.WhatsApp />
				</div>
			</div>
		</div>
	);
}
