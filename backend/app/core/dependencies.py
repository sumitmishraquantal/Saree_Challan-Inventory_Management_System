from fastapi import (
    Depends,
    HTTPException,
    status
)

from fastapi.security import (
    OAuth2PasswordBearer
)

from jose import (
    JWTError,
    jwt
)

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.user import User

from app.db.database import SessionLocal

from app.core.security import (
    SECRET_KEY,
    ALGORITHM
)


oauth2_scheme = OAuth2PasswordBearer(
        tokenUrl="/auth/login"
    )


def get_current_user(

    token: str = Depends(
        oauth2_scheme
    ),

    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(

            status_code=
                status.HTTP_401_UNAUTHORIZED,

            detail="Invalid authentication",

            headers={
                "WWW-Authenticate":
                "Bearer"
            },
        )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email: str = payload.get("sub")

        if email is None:

            raise credentials_exception

    except JWTError:

        raise credentials_exception


    user = (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )

    if user is None:

        raise credentials_exception

    return user


def require_admin(

    current_user: User =
        Depends(get_current_user)
):

    if current_user.role != "admin":

        raise HTTPException(

            status_code=403,

            detail=
                "Admin access required"
        )

    return current_user



def require_operator(

    current_user: User =
        Depends(get_current_user)
):

    allowed_roles = [
        "admin",
        "operator"
    ]

    if current_user.role not in allowed_roles:

        raise HTTPException(

            status_code=403,

            detail=
                "Operator access required"
        )

    return current_user



def require_warehouse(

    current_user: User =
        Depends(get_current_user)
):

    allowed_roles = [
        "admin",
        "warehouse"
    ]

    if current_user.role not in allowed_roles:

        raise HTTPException(

            status_code=403,

            detail=
                "Warehouse access required"
        )

    return current_user



def require_accountant(

    current_user: User =
        Depends(get_current_user)
):

    allowed_roles = [
        "admin",
        "accountant"
    ]

    if current_user.role not in allowed_roles:

        raise HTTPException(

            status_code=403,

            detail=
                "Accountant access required"
        )

    return current_user