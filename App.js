import { useState, useEffect } from "react";
import { Search, MapPin, Play, ExternalLink, ChefHat } from "lucide-react";

export default function App() {
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState("Arrabiata");
  const [loading, setLoading] = useState(false);
  const [expandedMeal, setExpandedMeal] = useState(null);

  async function getMeals() {
    try {
      setLoading(true);
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal
      );
      const data = await res.json();
      setMeals(data.meals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMeals();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    getMeals();
  }

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure: measure || '' });
      }
    }
    return ingredients;
  };

  const toggleExpanded = (mealId) => {
    setExpandedMeal(expandedMeal === mealId ? null : mealId);
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fed7aa 0%, #fef3c7 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem 1rem'
        }}
      >
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div 
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
            }}
          >
            <ChefHat style={{ width: '40px', height: '40px', color: 'white' }} />
          </div>
          
          <h1 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Recipe <span style={{ color: '#f97316' }}>Finder</span>
          </h1>
          
          <p 
            style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
          >
            Discover delicious recipes from around the world. Search for your favorite dishes and get cooking!
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
          <div 
            style={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <Search 
              style={{ 
                width: '24px', 
                height: '24px', 
                color: '#9ca3af',
                marginLeft: '1rem'
              }} 
            />
            <input
              type="text"
              placeholder="Search for a delicious recipe..."
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              disabled={loading}
              style={{
                flex: '1',
                padding: '1rem',
                fontSize: '1.125rem',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: '#374151'
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #f97316, #ea580c)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
                transition: 'all 0.3s ease',
                transform: loading ? 'none' : 'translateY(0)'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.3)';
                }
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div 
              style={{
                width: '50px',
                height: '50px',
                border: '4px solid #fed7aa',
                borderTop: '4px solid #f97316',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 1s linear infinite'
              }}
            ></div>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
            <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '1.125rem' }}>
              Finding delicious recipes...
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            {meals ? (
              <div 
                style={{
                  display: 'grid',
                  gap: '2rem',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
                }}
              >
                {meals.map((mealItem) => (
                  <div
                    key={mealItem.idMeal}
                    style={{
                      background: 'white',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative' }}>
                      <img
                        src={mealItem.strMealThumb}
                        alt={mealItem.strMeal}
                        style={{
                          width: '100%',
                          height: 'auto',
                          aspectRatio: '16/9',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          backgroundColor: '#f8fafc'
                        }}
                      />
                      <div 
                        style={{
                          position: 'absolute',
                          inset: '0',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)'
                        }}
                      ></div>
                      
                      {/* Badges */}
                      <div 
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap'
                        }}
                      >
                        <span 
                          style={{
                            background: 'rgba(255,255,255,0.95)',
                            color: '#f97316',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          {mealItem.strCategory}
                        </span>
                        <span 
                          style={{
                            background: 'rgba(255,255,255,0.95)',
                            color: '#3b82f6',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <MapPin style={{ width: '12px', height: '12px' }} />
                          {mealItem.strArea}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '2rem' }}>
                      
                      {/* Title */}
                      <h2 
                        style={{
                          fontSize: '1.75rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          marginBottom: '1.5rem',
                          lineHeight: '1.3'
                        }}
                      >
                        {mealItem.strMeal}
                      </h2>

                      {/* Ingredients */}
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <div 
                            style={{
                              width: '8px',
                              height: '8px',
                              background: '#f97316',
                              borderRadius: '50%'
                            }}
                          ></div>
                          Ingredients
                        </h3>
                        <div 
                          style={{
                            background: '#fff7ed',
                            borderRadius: '16px',
                            padding: '1.5rem'
                          }}
                        >
                          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                            {getIngredients(mealItem).map((item, index) => (
                              <li 
                                key={index}
                                style={{
                                  fontSize: '1rem',
                                  color: '#4b5563',
                                  marginBottom: '0.75rem',
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '0.75rem',
                                  padding: '0.5rem 0'
                                }}
                              >
                                <span 
                                  style={{
                                    width: '6px',
                                    height: '6px',
                                    background: '#f97316',
                                    borderRadius: '50%',
                                    marginTop: '0.5rem',
                                    flexShrink: '0'
                                  }}
                                ></span>
                                <span style={{ lineHeight: '1.5' }}>
                                  <span style={{ fontWeight: '600', color: '#ea580c' }}>
                                    {item.measure}
                                  </span> {item.ingredient}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <h3 
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: '600',
                              color: '#374151',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              margin: '0'
                            }}
                          >
                            <div 
                              style={{
                                width: '8px',
                                height: '8px',
                                background: '#f97316',
                                borderRadius: '50%'
                              }}
                            ></div>
                            Instructions
                          </h3>
                          <button
                            onClick={() => toggleExpanded(mealItem.idMeal)}
                            style={{
                              background: 'none',
                              border: '2px solid #f97316',
                              color: '#f97316',
                              borderRadius: '20px',
                              padding: '0.5rem 1rem',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = '#f97316';
                              e.target.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = 'none';
                              e.target.style.color = '#f97316';
                            }}
                          >
                            {expandedMeal === mealItem.idMeal ? 'Show Less' : 'Show Full'}
                          </button>
                        </div>
                        <div 
                          style={{
                            background: '#fefce8',
                            borderRadius: '16px',
                            padding: '1.5rem'
                          }}
                        >
                          <p 
                            style={{
                              fontSize: '1rem',
                              color: '#4b5563',
                              lineHeight: '1.7',
                              margin: '0',
                              whiteSpace: 'pre-line'
                            }}
                          >
                            {expandedMeal === mealItem.idMeal 
                              ? mealItem.strInstructions
                              : mealItem.strInstructions.length > 200 
                                ? mealItem.strInstructions.substring(0, 200) + "..." 
                                : mealItem.strInstructions
                            }
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {mealItem.strYoutube && (
                          <a
                            href={mealItem.strYoutube}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                              color: 'white',
                              textDecoration: 'none',
                              fontWeight: '600',
                              fontSize: '1rem',
                              padding: '1rem 1.5rem',
                              borderRadius: '12px',
                              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                            }}
                          >
                            <Play style={{ width: '18px', height: '18px' }} />
                            Watch Video
                          </a>
                        )}
                        {mealItem.strSource && (
                          <a
                            href={mealItem.strSource}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                              color: 'white',
                              textDecoration: 'none',
                              fontWeight: '600',
                              fontSize: '1rem',
                              padding: '1rem 1.5rem',
                              borderRadius: '12px',
                              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                            }}
                          >
                            <ExternalLink style={{ width: '18px', height: '18px' }} />
                            View Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div 
                  style={{
                    background: 'linear-gradient(135deg, #fef2f2, #fce7e7)',
                    border: '2px solid #fecaca',
                    borderRadius: '24px',
                    padding: '3rem',
                    maxWidth: '500px',
                    margin: '0 auto'
                  }}
                >
                  <div 
                    style={{
                      width: '64px',
                      height: '64px',
                      background: '#fee2e2',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem'
                    }}
                  >
                    <Search style={{ width: '32px', height: '32px', color: '#ef4444' }} />
                  </div>
                  <h2 
                    style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '1rem'
                    }}
                  >
                    No recipes found
                  </h2>
                  <p 
                    style={{
                      fontSize: '1.125rem',
                      color: '#6b7280',
                      lineHeight: '1.6'
                    }}
                  >
                    Sorry, we couldn't find any recipes for "{meal}". Try searching for something else!
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}