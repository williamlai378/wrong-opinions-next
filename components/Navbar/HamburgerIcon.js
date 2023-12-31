'use client'
import './navbarStyles.css'

export default function HamburgerIcon({ toggle, setToggle }) {


    return (
        <div
            onClick={() => { setToggle(!toggle) }}
            className={`hamburger-container ${toggle ? 'toggled' : ''}`}>
            <svg
                viewBox="0 0 521 469"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g 
                    id="undraw_throw_away_re_x60k 1" 
                    clipPath="url(#clip0_1_2)" 
                    className={`nav-menu-button ${toggle ? 'active': ''}`}>
                    <path id="Path 8" d="M355.815 417H164.187L164.15 415.852L155 136H365L355.815 417ZM166.336 414.62H353.665L362.697 138.38H157.303L166.336 414.62Z" fill="#3F3D56" stroke="black" strokeWidth="4" />
                    <g id="trashcan-lines hamburger">
                        <path id="Rectangle 17" d="M177.773 323.296V337.281L345.037 337.281V323.296L177.773 323.296Z" fill="#3F3D56" className='menu-line top' />
                        <path id="Rectangle 18" d="M177.773 268.232V282.217L345.037 282.217V268.232L177.773 268.232Z" fill="#3F3D56" className='menu-line middle' />
                        <path id="Rectangle 19" d="M177.773 213.167V227.152L345.037 227.152V213.167L177.773 213.167Z" fill="#3F3D56" className='menu-line bottom' />
                    </g>
                    <g id="trashcan-lid" filter="url(#filter0_d_1_2)">
                        <path id="Vector" d="M407.525 139.082L406.386 139.088L118.231 140.65L115.475 100.091L116.615 100.084L404.769 98.5227L407.525 139.082ZM120.35 138.302L405.088 136.759L402.65 100.872L117.912 102.413L120.35 138.302Z" fill="#3F3D56" stroke="black" strokeWidth="4" />
                        <path id="Path 10" d="M260.975 27.3276C252.595 27.3673 244.557 29.8714 237.815 34.5425C231.073 39.2137 225.909 45.8559 222.937 53.6809C219.965 61.5059 219.309 70.1852 221.047 78.6889C222.785 87.1925 226.844 95.1636 232.743 101.656L246.483 101.582C240.104 97.3384 235.092 91.2005 232.181 84.0668C229.269 76.9331 228.611 69.1783 230.304 61.9378C231.996 54.6974 235.949 48.3516 241.585 43.8298C247.22 39.308 254.242 36.8477 261.621 36.809C269.001 36.7703 276.351 39.1554 282.595 43.6149C288.839 48.0745 293.65 54.3742 296.322 61.5918C298.994 68.8094 299.387 76.5656 297.445 83.7248C295.502 90.884 291.325 97.07 285.526 101.377L299.266 101.303C304.281 94.7531 307.257 86.7452 307.842 78.2293C308.427 69.7134 306.596 61.047 302.565 53.2586C298.535 45.4702 292.475 38.8867 285.105 34.2894C277.734 29.692 269.362 27.2739 260.983 27.3219L260.975 27.3276Z" fill="#3F3D56" />
                    </g>
                </g>
            </svg>
        </div>
    )
}