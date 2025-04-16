type RouterLike = {
  push: (url: string) => void | Promise<boolean>
}

export const TOKEN_EXPIRY = 24 * 60 * 60 * 1000
export const ADMIN_USERNAME = "Wec@Pec@EmpowerU"
export const ADMIN_PASSWORD = "Wec@Pec@EmpowerU@777"

export function createAdminToken(): string {
  const tokenData = {
    token: `admin-${Date.now()}-${Math.random().toString(36).substring(2)}`,
    expiry: new Date().getTime() + TOKEN_EXPIRY
  }
  
  localStorage.setItem("admin_auth_token", JSON.stringify(tokenData))
  localStorage.setItem("admin_authenticated", "true")
  
  return tokenData.token
}

export function clearAdminToken(): void {
  localStorage.removeItem("admin_auth_token")
  localStorage.removeItem("admin_authenticated")
}

export function checkAdminAuth(router?: RouterLike): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const tokenData = localStorage.getItem("admin_auth_token")
    
    if (!tokenData) {
      console.log("No admin token found")
      if (router) router.push('/admin/login')
      return false
    }
    
    const { token, expiry } = JSON.parse(tokenData)
    
    if (token && expiry && new Date().getTime() < expiry) {
      console.log("Admin token valid, authenticated")
      return true
    }

    console.log("Admin token expired")
    clearAdminToken()
    if (router) router.push('/admin/login')
    return false
  } catch (err) {
    console.error("Error parsing auth token:", err)
    clearAdminToken()
    if (router) router.push('/admin/login')
    return false
  }
}

export function isAdminAuthenticated(router?: RouterLike): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const newAuthValid = checkAdminAuth(undefined)
    const oldAuthValid = localStorage.getItem("admin_authenticated") === "true"
    const isValid = newAuthValid || oldAuthValid
    
    if (!isValid && router) {
      router.push('/admin/login')
    }
    
    return isValid
  } catch (error) {
    console.error("Error checking authentication:", error);
    if (router) {
      router.push('/admin/login')
    }
    return false;
  }
}