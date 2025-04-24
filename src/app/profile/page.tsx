import { UserProfile } from '@clerk/nextjs'
import Sidebar from '@/components/sidebar';
import { neobrutalism } from '@clerk/themes'

const UserProfilePage = () => (
    <div>
    <Sidebar />
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '1rem',
    boxSizing: 'border-box'
  }}>
    <UserProfile routing="hash"  appearance={{ baseTheme: neobrutalism }} />
  </div>
    </div>
)

export default UserProfilePage
