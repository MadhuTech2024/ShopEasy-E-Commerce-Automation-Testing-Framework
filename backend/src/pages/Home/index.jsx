import HeroSection from '../../components/HeroSection'
import SearchBar from '../../components/SearchBar'
import CategoryNavigation from '../../components/CategoryNavigation'
import ProductGrid from '../../components/ProductGrid'

const Home = () => {
  return (
    <main>
      <HeroSection />
      <SearchBar />
      <CategoryNavigation />
      <ProductGrid />
    </main>
  )
}

export default Home