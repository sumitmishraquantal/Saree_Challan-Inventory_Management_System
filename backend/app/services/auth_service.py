from sqlalchemy.orm import Session

from app.models.user import User

from app.schemas.user_schema import (
    UserCreate
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


def register_user(
    db: Session,
    user_data: UserCreate
):

    existing_user = (
        db.query(User)
        .filter(
            User.email ==
            user_data.email
        )
        .first()
    )

    if existing_user:

        raise Exception(
            "Email already registered"
        )


    db_user = User(

        name=user_data.name,

        email=user_data.email,

        hashed_password=
            hash_password(
                user_data.password
            ),

        role=user_data.role
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user


def login_user(
    db: Session,
    email: str,
    password: str
):

    user = (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )

    if not user:

        raise Exception(
            "Invalid credentials"
        )

    valid_password = (
        verify_password(
            password,
            user.hashed_password
        )
    )

    if not valid_password:

        raise Exception(
            "Invalid credentials"
        )

    token = create_access_token({

            "sub": user.email,

            "role": user.role,

            "user_id": user.id
        })

    return {
        "access_token": token,
        "token_type": "bearer"
    }