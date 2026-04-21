.navbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--text);
  text-decoration: none;
}

.brand-icon {
  font-size: 1.4rem;
}

.brand-text {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--text);
  background: var(--surface2);
}

.nav-link.active {
  color: var(--accent2);
  background: rgba(88, 166, 255, 0.12);
}
