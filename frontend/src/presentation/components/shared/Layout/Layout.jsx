import SideBar from '../Navigation/SideBar/SideBar.jsx'
import styles from './Layout.module.css'
import Widgets from '../Widgets/Widgets.jsx'
export default function Layout({children}) {
    return(
        <div className={styles.ContainerLayout}>
            <header className={styles.LeftColumn}>
                <div className={styles.SideBar}>
                    <SideBar></SideBar>
                </div>
            </header>
            <main className={styles.Main}>
                {children}
            </main>

            <aside className={styles.RightColumn}>
                <div className={styles.Widgets}>
                    <Widgets></Widgets>
                </div>
            </aside>
        </div>
    );
}