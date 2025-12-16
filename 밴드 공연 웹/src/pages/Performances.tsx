import { useData } from '../contexts/DataContext'
import Setlist from '../components/Setlist'
import Performers from '../components/Performers'
import './Performances.css'

const Performances = () => {
  const { performanceData } = useData()

  return (
    <div className="performances-page">
      <h1>공연 정보</h1>
      
      <div className="performances-content">
        {performanceData?.setlist && performanceData.setlist.length > 0 && (
          <section className="performances-section">
            <Setlist setlist={performanceData.setlist} />
          </section>
        )}

        {performanceData?.performers && performanceData.performers.length > 0 && (
          <section className="performances-section">
            <Performers 
              performers={performanceData.performers} 
              setlist={performanceData.setlist || []}
            />
          </section>
        )}

        {(!performanceData?.setlist || performanceData.setlist.length === 0) &&
         (!performanceData?.performers || performanceData.performers.length === 0) && (
          <div className="empty-state">
            <p>공연 정보가 아직 설정되지 않았습니다.</p>
            <p>관리자 페이지에서 공연 정보를 설정해주세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Performances

