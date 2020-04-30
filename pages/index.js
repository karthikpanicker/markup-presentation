import Head from 'next/head'
import {useState} from 'react';
import {getAllSlidesData} from "../util/slides";
import utilStyles from '../styles/utils.module.css';
import Layout from '../components/layout';
import Navigation from "../components/navigation";

export default function Home({slides}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [slideContent, setSlideContent] = useState((slides.length) ? slides[0].htmlContent: '');

    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
        console.log(newPage);
        setSlideContent(slides[newPage].htmlContent);
    };

    return (
        <Layout home>
            <Head>
                <title>Presentation</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className={`${utilStyles.slideBorder} shadow-2xl`}>
                <div className="slideContainer" dangerouslySetInnerHTML={{__html: slideContent}}/>
            </div>
            <Navigation initialSlide={currentPage} totalSlides={slides.length} notifyPageChange={onPageChange}/>

            <style jsx>
                {`.slideContainer {height: 100%; width:100%}`}
            </style>
        </Layout>
    );
}

export async function getStaticProps() {
    const slides = await getAllSlidesData();
    return {
        props: {
            slides
        }
    }
}
