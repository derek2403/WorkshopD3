import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    alert(`Thank you for subscribing with: ${email}`)
    setEmail('')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Workshop D3 - Data Visualization Workshop</title>
        <meta name="description" content="Learn data visualization with D3.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>WorkshopD3</div>
        <nav className={styles.nav}>
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#pricing">Pricing</a>
          <Link href="/chatbot" legacyBehavior>
            <a className={styles.navLink}>Chatbot</a>
          </Link>
          <a href="#contact" className={styles.ctaButton}>Get Started</a>
        </nav>
      </header>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Master Data Visualization with D3.js</h1>
            <p className={styles.description}>
              Transform complex data into beautiful, interactive visualizations that tell compelling stories.
            </p>
            <div className={styles.ctaContainer}>
              <a href="#contact" className={styles.primaryButton}>Get Started</a>
              <a href="#demo" className={styles.secondaryButton}>See Examples</a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/hero-image.svg" alt="Data visualization" />
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features} id="features">
          <h2 className={styles.sectionTitle}>Why Choose Our Workshop?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Interactive Learning</h3>
              <p>Hands-on exercises and real-world projects to solidify your skills.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🧪</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of data visualization experience.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💡</div>
              <h3>Comprehensive Curriculum</h3>
              <p>From basics to advanced techniques, we cover everything you need to know.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h3>Portfolio Projects</h3>
              <p>Build impressive visualizations to showcase your skills to potential employers.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonials} id="testimonials">
          <h2 className={styles.sectionTitle}>What Our Students Say</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <p>"This workshop transformed my understanding of data visualization. I now create compelling visuals that drive business decisions."</p>
              <div className={styles.testimonialAuthor}>
                <img 
                  src="https://play-lh.googleusercontent.com/f-g42HMgOFg48mNaSKNbOkarjGjRjOLJjXo5StgOFj5ItbTweGrk5lI26rezmjlKl4g=w240-h480-rw" 
                  alt="Avatar" 
                  className={styles.avatar} 
                />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>Data Analyst at TechCorp</p>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <p>"The instructors are incredibly knowledgeable and supportive. I went from D3 novice to creating complex interactive dashboards."</p>
              <div className={styles.testimonialAuthor}>
                <img 
                  src="https://i5.walmartimages.com/seo/Tralalero-Tralala-Toys-Tralalero-Tralala-AI-Italian-Animals-Tralalero-Figures-Shark-Doll-Italian-Brainrot-Figure-Non-Movable-Action-Figures-Collectio_01830384-d9f8-42d3-a44b-568651bf7540.0cbd64cca6abc7b7076228cd2c467e4e.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" 
                  alt="Avatar" 
                  className={styles.avatar} 
                />
                <div>
                  <h4>Michael Chen</h4>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className={styles.pricing} id="pricing">
          <h2 className={styles.sectionTitle}>Choose Your Plan</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3>Basic</h3>
              <div className={styles.price}>$299</div>
              <ul className={styles.pricingFeatures}>
                <li>4-week access</li>
                <li>Core D3.js curriculum</li>
                <li>10 practice exercises</li>
                <li>Community forum access</li>
              </ul>
              <a href="#contact" className={styles.pricingButton}>Get Started</a>
            </div>
            <div className={`${styles.pricingCard} ${styles.popularPlan}`}>
              <div className={styles.popularTag}>Most Popular</div>
              <h3>Professional</h3>
              <div className={styles.price}>$499</div>
              <ul className={styles.pricingFeatures}>
                <li>8-week access</li>
                <li>Complete D3.js curriculum</li>
                <li>25+ practice exercises</li>
                <li>1-on-1 mentoring sessions</li>
                <li>Certificate of completion</li>
              </ul>
              <a href="#contact" className={styles.pricingButton}>Get Started</a>
            </div>
            <div className={styles.pricingCard}>
              <h3>Enterprise</h3>
              <div className={styles.price}>Custom</div>
              <ul className={styles.pricingFeatures}>
                <li>Unlimited access</li>
                <li>Team training</li>
                <li>Custom curriculum</li>
                <li>Dedicated support</li>
                <li>Private workshops</li>
              </ul>
              <a href="#contact" className={styles.pricingButton}>Contact Us</a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contact} id="contact">
          <h2 className={styles.sectionTitle}>Ready to Transform Your Data Skills?</h2>
          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <p>Sign up for our newsletter to receive the latest updates and exclusive offers.</p>
              <form onSubmit={handleSubmit} className={styles.subscribeForm}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.subscribeButton}>Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h4>WorkshopD3</h4>
            <p>Empowering data professionals with cutting-edge visualization skills.</p>
          </div>
          <div className={styles.footerColumn}>
            <h4>Resources</h4>
            <a href="#">Blog</a>
            <a href="#">Documentation</a>
            <a href="#">Examples</a>
          </div>
          <div className={styles.footerColumn}>
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className={styles.footerColumn}>
            <h4>Legal</h4>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} WorkshopD3. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
