from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.user_schema import (
    UserCreate,
    UserLogin,
    UserResponse,
    TokenResponse
)

from app.services.auth_service import (
    register_user,
    login_user
)

from fastapi.security import (
    OAuth2PasswordRequestForm
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# REGISTER
@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):

    try:

        return register_user(
            db,
            user_data
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# LOGIN
@router.post(
    "/login",
    response_model=TokenResponse
)
def login(

    form_data:
        OAuth2PasswordRequestForm =
        Depends(),

    db: Session = Depends(get_db)
):

    try:

        return login_user(

            db,

            form_data.username,

            form_data.password
        )

    except Exception as e:

        raise HTTPException(

            status_code=401,

            detail=str(e)
        )