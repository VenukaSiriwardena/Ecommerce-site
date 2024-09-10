import React from 'react';
import TopHeader from '../navBar';
import Mainbanner from '../home/WatchBanner';
import Best_smartphones from '../home/best_deals_smartphones';
import Top_categories from '../home/top_categories';
import Footer from '../footer';

function Home() {
    return (
        <>
            <TopHeader />
            <Mainbanner />
            <Best_smartphones />
            <Top_categories />
            <Footer />
        </>
    );
}

export default Home;