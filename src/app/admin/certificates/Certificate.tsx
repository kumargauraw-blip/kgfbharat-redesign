import { forwardRef } from "react"
import styles from "./certificate.module.css"

export interface CertificateData {
    studentName: string
    courseName: string
    classification: string
    certId: string
    startDate: string // formatted, e.g. "June 1, 2026"
    endDate: string
    certificateDate: string
    sig1Name: string
    sig1Title: string
    sig2Name: string
    sig2Title: string
}

/* eslint-disable @next/next/no-img-element */
const Certificate = forwardRef<HTMLDivElement, { data: CertificateData }>(
    function Certificate({ data }, ref) {
        const {
            studentName,
            courseName,
            classification,
            certId,
            startDate,
            endDate,
            certificateDate,
            sig1Name,
            sig1Title,
            sig2Name,
            sig2Title,
        } = data

        return (
            <div className={styles["certificate-container"]} ref={ref}>
                <div className={styles.watermark}>KGF BHARAT</div>

                <span className={`${styles.corner} ${styles["corner-tl"]}`} />
                <span className={`${styles.corner} ${styles["corner-tr"]}`} />
                <span className={`${styles.corner} ${styles["corner-bl"]}`} />
                <span className={`${styles.corner} ${styles["corner-br"]}`} />

                <div className={styles.content}>
                    <div className={styles["header-container"]}>
                        <img src="/kgf-new-logo.png" alt="KGF Bharat Logo" className={styles.logo} />

                        <div className={styles["header-text"]}>
                            <div className={styles.subtitle}>Kurukshetra Gurukulam Foundation</div>
                            <h1 className={styles.title}>KGF PATHSHALA</h1>
                            <div className={styles.motto}>Ancient Wisdom Meets Modern Intelligence</div>
                        </div>

                        <img
                            src="/krishna-worldwide-logo-small-square.png"
                            alt="Krishna Worldwide Logo"
                            className={styles.logo}
                        />
                    </div>

                    <h2 className={styles["certificate-title"]}>CERTIFICATE OF COMPLETION</h2>

                    <div className={styles["presented-to"]}>This is proudly presented to</div>

                    <div className={styles["student-name"]}>{studentName || "Student Name"}</div>

                    <div className={styles["course-description"]}>
                        For successfully completing the{" "}
                        <strong>{classification || "comprehensive AI & Technology"}</strong> program
                        {(startDate || endDate) && (
                            <>
                                {" "}conducted from <strong>{startDate || "—"}</strong> to{" "}
                                <strong>{endDate || "—"}</strong>
                            </>
                        )}{" "}
                        and demonstrating outstanding dedication to skill mastery in:
                        <br />
                        <span className={styles["course-box"]}>
                            <span className={styles["course-name"]}>{courseName || "Course Name"}</span>
                        </span>
                    </div>

                    <div className={styles.signatures}>
                        <div className={styles["signature-block"]}>
                            <div className={styles["signature-line"]}>
                                <img
                                    src="/sandeep-signature.png"
                                    alt="Signature"
                                    className={styles["signature-img"]}
                                />
                            </div>
                            <p className={styles["signature-name"]}>{sig1Name || "Sandeep Deo"}</p>
                            <p className={styles["signature-title"]}>
                                {sig1Title || "Founder & President, KGF Bharat"}
                            </p>
                        </div>

                        <div className={styles["issue-block"]}>
                            <div className={styles["issue-label"]}>Date of Issue</div>
                            <div className={styles["issue-box"]}>{certificateDate || "—"}</div>
                        </div>

                        <div className={styles["signature-block"]}>
                            <div className={styles["signature-line"]}>
                                <img
                                    src="/gauraw-signature.png"
                                    alt="Signature"
                                    className={styles["signature-img"]}
                                />
                            </div>
                            <p className={styles["signature-name"]}>{sig2Name || "Kumar Gauraw"}</p>
                            <p className={styles["signature-title"]}>
                                {sig2Title || "Head Coach & Lead AI Educator"}
                            </p>
                        </div>
                    </div>

                    <div className={styles["footer-strip"]}>
                        <span>Issued by: KGF Pathshala Digital Registry</span>
                        <span className={styles["footer-mid"]}>ID: {certId || "KGF-0000-AI-00000"}</span>
                        <span className={styles.status}>
                            <span className={styles["status-dot"]} />
                            Status: Verified Genuine
                        </span>
                    </div>
                </div>
            </div>
        )
    }
)

export default Certificate
