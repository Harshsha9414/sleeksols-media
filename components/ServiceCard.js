const ServiceCard = ({ title, description }) => {
    return (
      <div className="service-card">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    );
  };