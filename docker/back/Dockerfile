FROM thinkwhere/gdal-python
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
COPY . /backend/