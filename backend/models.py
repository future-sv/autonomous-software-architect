from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, Text

from database import Base


class Architecture(Base):
    __tablename__ = "architectures"

    id = Column(Integer, primary_key=True, index=True)

    project_description = Column(Text, nullable=False)

    project_overview = Column(Text, nullable=False)
    frontend = Column(Text, nullable=False)
    backend = Column(Text, nullable=False)
    database = Column(Text, nullable=False)
    api_design = Column(Text, nullable=False)
    authentication_security = Column(Text, nullable=False)
    deployment = Column(Text, nullable=False)

    implementation_plan = Column(Text, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)