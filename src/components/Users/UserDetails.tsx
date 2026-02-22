import React, { Fragment, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import starIcon from '@/assets/svg/star.svg'
import outlineStarIcon from '@/assets/svg/outline-star.svg'
import backIcon from '@/assets/icons/back.svg'
import outlineUserIcon from '@/assets/svg/outline-user.svg'
import './UserDetails.scss'
import { fetchUserDetails, type Guarantor } from '@/services/userService'

interface UserDetailsProps {
  setUserPage: React.Dispatch<React.SetStateAction<'users' | 'userdetails'>>
  userId?: string
}

type TabType = 'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'app'

export default function UserDetails({ setUserPage, userId = '1' }: UserDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general')

  const { data: userData, isLoading: loading, error, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserDetails(userId),
    staleTime: 5 * 60 * 1000,
    retry: 2
  })

  const renderStarRating = (rating: number) => {
    return (
      <div className="star-rating" role="img" aria-label={`${rating} out of 3 stars`}>
        {[...Array(3)].map((_, i) => (
          <Fragment key={i}>
            {i < rating ? (
              <img src={starIcon} alt="" aria-hidden="true" />
            ) : (
              <img src={outlineStarIcon} alt="" aria-hidden="true" />
            )}
          </Fragment>
        ))}
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="user-details">
        <div className="user-details-loading" role="status" aria-live="polite">
          Loading user details...
        </div>
      </div>
    )
  }

  // Error state
  if (error || !userData) {
    return (
      <div className="user-details">
        <div className="user-details-error" role="alert">
          <p>{error instanceof Error ? error.message : 'Failed to load user details'}</p>
          <button onClick={() => refetch()} type="button" className="retry-button">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="user-details">
      {/* Header Section */}
      <div className="user-details__header">
        <button
          className="back-button"
          onClick={() => setUserPage('users')}
          type="button"
          aria-label="Back to users"
        >
          <img src={backIcon} alt="" aria-hidden="true" />
          Back to Users
        </button>
        <div className="user-details__actions">
          <button className="action-btn action-btn--blacklist" type="button">
            BLACKLIST USER
          </button>
          <button className="action-btn action-btn--activate" type="button">
            ACTIVATE USER
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-card__top">
          <div className="profile-avatar" role="img" aria-label="User avatar">
            <img src={outlineUserIcon} alt="" aria-hidden="true" />
          </div>
          <div className="profile-card__details">
            <div className="profile-avatar profile-avatar--mobile" role="img" aria-label="User avatar">
              <img src={outlineUserIcon} alt="" aria-hidden="true" />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{userData.fullName}</h2>
              <p className="profile-id">{userData.id}</p>
            </div>

            <hr aria-hidden="true" className="profile-hr--desktop" />

            <div className="profile-details--desktop">
              <div className="detail-item">
                <label>User's Tier</label>
                {renderStarRating(userData.tier)}
              </div>

              <hr aria-hidden="true" />

              <div className="detail-item">
                <label className="detail-amount">₦{userData.amount.toLocaleString()}</label>
                <p className="detail-value">{userData.accountNumber}</p>
              </div>
            </div>
          </div>

          <div className="profile-details--mobile">
            <div className="detail-item">
              <label>User's Tier</label>
              {renderStarRating(userData.tier)}
            </div>

            <div className="detail-item">
              <label className="detail-amount">₦{userData.amount.toLocaleString()}</label>
              <p className="detail-value">{userData.accountNumber}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs" role="tablist">
            {(['general', 'documents', 'bank', 'loans', 'savings', 'app'] as const).map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`${tab}-panel`}
                type="button"
              >
                {tab === 'general' && 'General Details'}
                {tab === 'documents' && 'Documents'}
                {tab === 'bank' && 'Bank Details'}
                {tab === 'loans' && 'Loans'}
                {tab === 'savings' && 'Savings'}
                {tab === 'app' && 'App and System'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'general' && (
          <div id="general-panel" role="tabpanel" aria-labelledby="general">
            <div className="general-content">
              {/* Personal Information */}
              <section className="content-section">
                <h3 className="section-title">Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>FULL NAME</label>
                    <p>{userData.fullName}</p>
                  </div>
                  <div className="info-item">
                    <label>PHONE NUMBER</label>
                    <p>{userData.phoneNumber}</p>
                  </div>
                  <div className="info-item">
                    <label>EMAIL ADDRESS</label>
                    <p>{userData.emailAddress}</p>
                  </div>
                  <div className="info-item">
                    <label>BVN</label>
                    <p>{userData.bvn}</p>
                  </div>
                  <div className="info-item">
                    <label>GENDER</label>
                    <p>{userData.gender}</p>
                  </div>
                  <div className="info-item">
                    <label>MARITAL STATUS</label>
                    <p>{userData.maritalStatus}</p>
                  </div>
                  <div className="info-item">
                    <label>CHILDREN</label>
                    <p>{userData.children}</p>
                  </div>
                  <div className="info-item">
                    <label>TYPE OF RESIDENCE</label>
                    <p>{userData.residenceType}</p>
                  </div>
                </div>
              </section>

              {/* Education and Employment */}
              <section className="content-section">
                <h3 className="section-title">Education and Employment</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>LEVEL OF EDUCATION</label>
                    <p>{userData.levelOfEducation}</p>
                  </div>
                  <div className="info-item">
                    <label>EMPLOYMENT STATUS</label>
                    <p>{userData.employmentStatus}</p>
                  </div>
                  <div className="info-item">
                    <label>SECTOR OF EMPLOYMENT</label>
                    <p>{userData.sectorOfEmployment}</p>
                  </div>
                  <div className="info-item">
                    <label>DURATION OF EMPLOYMENT</label>
                    <p>{userData.durationOfEmployment}</p>
                  </div>
                  <div className="info-item">
                    <label>OFFICE EMAIL</label>
                    <p>{userData.officeEmail}</p>
                  </div>
                  <div className="info-item">
                    <label>MONTHLY INCOME</label>
                    <p>{userData.monthlyIncome}</p>
                  </div>
                  <div className="info-item">
                    <label>LOAN REPAYMENT</label>
                    <p>{userData.loanRepayment}</p>
                  </div>
                </div>
              </section>

              {/* Socials */}
              <section className="content-section">
                <h3 className="section-title">Socials</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>TWITTER</label>
                    <p>{userData.twitter}</p>
                  </div>
                  <div className="info-item">
                    <label>FACEBOOK</label>
                    <p>{userData.facebook}</p>
                  </div>
                  <div className="info-item">
                    <label>INSTAGRAM</label>
                    <p>{userData.instagram}</p>
                  </div>
                </div>
              </section>

              {/* Guarantor */}
              <section className="content-section">
                <h3 className="section-title">Guarantor</h3>
                {userData.guarantors && userData.guarantors.length > 0 ? (
                  userData.guarantors.map((guarantor: Guarantor) => (
                    <div key={guarantor.id} className="guarantor-card">
                      <div className="info-grid">
                        <div className="info-item">
                          <label>FULL NAME</label>
                          <p>{guarantor.fullName}</p>
                        </div>
                        <div className="info-item">
                          <label>PHONE NUMBER</label>
                          <p>{guarantor.phoneNumber}</p>
                        </div>
                        <div className="info-item">
                          <label>EMAIL ADDRESS</label>
                          <p>{guarantor.emailAddress}</p>
                        </div>
                        <div className="info-item">
                          <label>RELATIONSHIP</label>
                          <p>{guarantor.relationship}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No guarantors</p>
                )}
              </section>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div id="documents-panel" role="tabpanel" className="tab-placeholder">
            <p>Documents section coming soon</p>
          </div>
        )}

        {activeTab === 'bank' && (
          <div id="bank-panel" role="tabpanel" className="tab-placeholder">
            <p>Bank Details section coming soon</p>
          </div>
        )}

        {activeTab === 'loans' && (
          <div id="loans-panel" role="tabpanel" className="tab-placeholder">
            <p>Loans section coming soon</p>
          </div>
        )}

        {activeTab === 'savings' && (
          <div id="savings-panel" role="tabpanel" className="tab-placeholder">
            <p>Savings section coming soon</p>
          </div>
        )}

        {activeTab === 'app' && (
          <div id="app-panel" role="tabpanel" className="tab-placeholder">
            <p>App and System section coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
