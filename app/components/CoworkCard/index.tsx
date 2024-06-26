// import Link from "next/link";
import styles from "./CoworkCard.module.css"
import Image from 'next/image';
import IResponseCoworking from '@/utils/types/coworkingsResponse';
export const CoworkCard = ({ cowork }: { cowork: IResponseCoworking }) => {

    return (
        <div className={styles.propertycard}>
            <figure className={`${styles.cardbanner} ${styles.imgholder}`} style={{ width: "400", height: "300" }}>
                <Image src={cowork.thumbnail || ''} width="400" height="300"
                    alt={cowork.name || ''} className={styles.imgcover} />
            </figure>
            <div className={styles.cardcontent}>
                {/* <Link href={`/coworkings/${cowork.id}`} > */}
                <h3 className={styles.h3}>
                    {cowork.name}
                </h3>
                {/* </Link> */}
                <ul className={styles.cardlist}>
                    <li className={styles.carditem}>
                        <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </li>
                    <li className="carditem">
                        <span className={styles.itemtext}>{cowork.open?.slice(0, 5)} am</span>
                    </li>
                    <span>-</span>
                    <li className="carditem">
                        <span className={styles.itemtext}>{cowork.close?.slice(0, 5)} pm</span>
                    </li>
                </ul>
                <div className={styles.cardmeta}>
                    <div>
                        <span className={styles.metatitle}>
                            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /></svg>
                            Ubicacion
                        </span>
                        <span className={styles.metatext}>
                            {`${cowork.city}, ${cowork.state}, ${cowork.country}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CoworkCard;